package org.empath.service;

import lombok.extern.slf4j.Slf4j;
import org.empath.constant.ErrorCodes;
import org.empath.exception.EmpathException;
import org.empath.model.db.Messaging;
import org.empath.model.dto.internal.MessagingData;
import org.empath.repository.ClientRepository;
import org.empath.repository.MessagingRepository;
import org.empath.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class MessagingService {

    @Autowired
    MessagingRepository messagingRepository;

    @Autowired
    ClientRepository clientRepository;

    public List<Messaging> getAllMessages() throws EmpathException {
        try {
            return messagingRepository.getAllMessages();
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    public List<Messaging> getMessagesByClientId(String clientId) throws EmpathException{
        try {
            return messagingRepository.getMessagesByClientId(clientId);
        } catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    public List<MessagingData> getMessagesByUserId(String userId) throws EmpathException{
        try {
            List<Messaging> messagingList = messagingRepository.getMessagesByUserId(userId);
            List<MessagingData> messagingDataList =  new ArrayList<>();
            for(Messaging messaging: messagingList){
                MessagingData messagingData = new MessagingData();
                messagingData.setUserId(messaging.getUserId());
                messagingData.setClientId(messaging.getClientId());
                messagingData.setMessage(messaging.getMessage());
                messagingData.setMessageId(messaging.getMessageId());
                messagingData.setCreatedTimestamp(messaging.getCreatedTimestamp());
                messagingData.setFlow(messaging.getFlow());
                messagingData.setClientName(clientRepository.getClientByClientId(messaging.getClientId()).getClientName());
                messagingDataList.add(messagingData);
            }
            return messagingDataList;
        } catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    public void addMessage(Messaging messaging) throws EmpathException {
        try{
            enrichMessage(messaging);
            messagingRepository.save(messaging);
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    @Transactional
    public void deleteMessageByMessageId(String messageId) throws EmpathException {
        try{
            if(messagingRepository.getMessagesByMessageId(messageId) != null) {
                messagingRepository.deleteMessageByMessageId(messageId);
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

    private void enrichMessage(Messaging messaging){
        messaging.setMessageId(CommonUtil.getUUID());
    }

}
