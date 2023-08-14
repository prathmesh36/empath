package org.empath.service;

import lombok.extern.slf4j.Slf4j;
import org.empath.constant.ErrorCodes;
import org.empath.exception.EmpathException;
import org.empath.model.db.Client;
import org.empath.repository.ClientRepository;
import org.empath.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@Service
public class ClientService {

    @Autowired
    ClientRepository clientRepository;

    public List<Client> getAllClients() throws EmpathException {
        try {
            return clientRepository.getAllClients();
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    public Client getClientByClientId(String clientId) throws EmpathException{
        try {
            return clientRepository.getClientByClientId(clientId);
        } catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    public void addClient(Client client) throws EmpathException {
        try{
            enrichClient(client);
            clientRepository.save(client);
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    @Transactional
    public void deleteClientByClientId(String clientId) throws EmpathException {
        try{
            if(clientRepository.getClientByClientId(clientId) != null) {
                clientRepository.deleteClientByClientId(clientId);
            }else {
                throw new EmpathException(ErrorCodes.ERROR_CODE_2.getMessage(), ErrorCodes.ERROR_CODE_2.getCode());
            }
        }catch(EmpathException e){
            throw e;
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    private void enrichClient(Client client){
        client.setClientId(CommonUtil.getUUID());
    }

}
