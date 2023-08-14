package org.empath.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.empath.constant.DebitCreditTypes;
import org.empath.constant.ErrorCodes;
import org.empath.exception.EmpathException;
import org.empath.model.db.Ledger;
import org.empath.model.dto.instagram.*;
import org.empath.repository.LedgerRepository;
import org.empath.repository.projection.UserProjection;
import org.empath.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class SMInteractionPointGenerationService {

    @Autowired
    RestService restService;

    @Autowired
    UserService userService;

    @Value("${instagram.media-url}")
    private String mediaUrl;

    @Value("${instagram.comment-url}")
    private String commentUrl;

    @Value("${instagram.non-expiry-token}")
    private String token;

    @Value("${instagram.commented-user-url}")
    private String commentedUserUrl;

    @Autowired
    LedgerRepository ledgerRepository;

    static int points = 10;

    @Transactional
    public void process() throws EmpathException {
        String mediaBody = restService.makeGetRequest(mediaUrl + "?accessToken=" + token);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            InstagramMedias instagramMedias = objectMapper.readValue(mediaBody, InstagramMedias.class);
            List<MediaDatum> mediaData = instagramMedias.data;
            for (MediaDatum mediaDatum: mediaData){
                String commentBody = restService.makeGetRequest(commentUrl + "/" + mediaDatum.id);
                InstagramComments instagramComments = objectMapper.readValue(commentBody, InstagramComments.class);
                List<CommentsDatum> commentsData = instagramComments.data;
                for (CommentsDatum commentsDatum: filterComments(commentsData)){
                    String commentedUserBody = restService.makeGetRequest(commentedUserUrl + "/" + commentsDatum.id);
                    InstagramCommentedUser instagramCommentedUser = objectMapper.readValue(commentedUserBody, InstagramCommentedUser.class);
                    String username = instagramCommentedUser.from;
                    UserProjection userProjection = userService.getUserByInstagramId(username);
                    userService.increaseOrDeductPointsByUserId(userProjection.getUserId(), points);
                    ledgerRepository.save(generateLedgerEntry(userProjection.getUserId(), username));
                }
            }
        }catch(EmpathException e){
            throw e;
        } catch (Exception e) {
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_4.getMessage(), ErrorCodes.ERROR_CODE_4.getCode());
        }
    }

    public List<CommentsDatum> filterComments(List<CommentsDatum> commentsData){
        List<CommentsDatum> filteredCommentsDatum = new ArrayList<>();
        for (CommentsDatum commentsDatum: commentsData){
            LocalDateTime startTime = LocalDateTime.now(ZoneId.of("UTC")).minusHours(24).withSecond(0).withNano(0);
            LocalDateTime endTime = startTime.minusHours(1);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'+0000'");
            LocalDateTime commentTimestamp = LocalDateTime.parse(commentsDatum.timestamp, formatter);

            int comparisonResultBefore = commentTimestamp.compareTo(endTime);
            int comparisonResultAfter = commentTimestamp.compareTo(startTime);

            if(comparisonResultBefore>=0 && comparisonResultAfter<=0) {
                filteredCommentsDatum.add(commentsDatum);
            }
        }
        return filteredCommentsDatum;
    }

    public Ledger generateLedgerEntry(String userid, String reference){
        Ledger ledger = new Ledger();
        ledger.setEntryId(CommonUtil.getUUID());
        ledger.setUserId(userid);
        ledger.setDebitCredit("C");
        ledger.setDebitCreditType(DebitCreditTypes.CREDIT_SM_INTERACTION.getCode());
        ledger.setDebitCreditReference(reference);
        ledger.setDebitCreditPoints(points);
        return ledger;
    }

}
