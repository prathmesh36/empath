package org.empath.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.empath.constant.DebitCreditTypes;
import org.empath.constant.ErrorCodes;
import org.empath.exception.EmpathException;
import org.empath.model.db.Client;
import org.empath.model.db.Ledger;
import org.empath.model.db.UserClientRelation;
import org.empath.model.dto.clientHistory.ClientHistoryData;
import org.empath.model.dto.Response;
import org.empath.repository.ClientRepository;
import org.empath.repository.LedgerRepository;
import org.empath.repository.UserClientRelationRepository;
import org.empath.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Service
public class PurchaseHistoryPointGenerationService {

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    RestService restService;

    @Autowired
    UserClientRelationRepository userClientRelationRepository;

    @Autowired
    UserService userService;

    @Autowired
    LedgerRepository ledgerRepository;

    static int points = 10;

    @Transactional
    public void process() throws EmpathException {
        List<Client> clients = clientRepository.getAllClients();
        List<ClientHistoryData> clientHistoryDataList = null;
        for(Client client: clients) {
            String body = restService.makeGetRequest(client.getClientHostUrl() + "/v1/simulator/getClientHistory");
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                Response<List<ClientHistoryData>> data = objectMapper.readValue(body, new TypeReference<Response<List<ClientHistoryData>>>() {
                });
                clientHistoryDataList = data.getBody();
                generatePoints(clientHistoryDataList, client.getClientId());
            }catch(EmpathException e){
                throw e;
            } catch (Exception e) {
                log.error("An error occurred for client {}: {}", client.getClientId(), e.getMessage(), e);
                throw new EmpathException(ErrorCodes.ERROR_CODE_4.getMessage(), ErrorCodes.ERROR_CODE_4.getCode());
            }
        }
    }

    public void generatePoints(List<ClientHistoryData> clientHistoryDataList, String clientId) throws EmpathException {
        for(ClientHistoryData clientHistoryData: clientHistoryDataList){
            LocalDateTime currentUtcTime = LocalDateTime.now(ZoneId.of("UTC")).withSecond(0).withNano(0);
            LocalDateTime currentUtcTimeMinusOne = currentUtcTime.minusHours(1);

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.S");
            LocalDateTime clientHistoryDateTime = LocalDateTime.parse(clientHistoryData.getTimestamp(), formatter);

            int comparisonResultBefore = clientHistoryDateTime.compareTo(currentUtcTimeMinusOne);
            int comparisonResultAfter = clientHistoryDateTime.compareTo(currentUtcTime);
            if(comparisonResultBefore>=0 && comparisonResultAfter<=0){
                UserClientRelation userClientRelation = userClientRelationRepository.getUserClientRelationsByClientUserIdAndClientId
                        (clientHistoryData.getUserName(), clientId);
                userService.increaseOrDeductPointsByUserId(userClientRelation.getUserId(), points);
                ledgerRepository.save(generateLedgerEntry(userClientRelation.getUserId(), userClientRelation.getClientId()));
            }
        }
    }

    public Ledger generateLedgerEntry(String userid, String reference){
        Ledger ledger = new Ledger();
        ledger.setEntryId(CommonUtil.getUUID());
        ledger.setUserId(userid);
        ledger.setDebitCredit("C");
        ledger.setDebitCreditType(DebitCreditTypes.CREDIT_PURCHASE_HISTORY.getCode());
        ledger.setDebitCreditReference(reference);
        ledger.setDebitCreditPoints(points);
        return ledger;
    }

}
