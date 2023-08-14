package org.empath.service;

import lombok.extern.slf4j.Slf4j;
import org.empath.constant.ErrorCodes;
import org.empath.exception.EmpathException;
import org.empath.model.db.Client;
import org.empath.model.db.User;
import org.empath.model.db.UserClientRelation;
import org.empath.model.dto.internal.UserClientData;
import org.empath.repository.ClientRepository;
import org.empath.repository.projection.UserProjection;
import org.empath.repository.UserClientRelationRepository;
import org.empath.repository.UserRepository;
import org.empath.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    UserClientRelationRepository userClientRelationRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    InstagramService instagramService;

    @Autowired
    ClientIdService clientIdService;

    public List<UserProjection> getAllUsers() throws EmpathException {
        try {
            return userRepository.getAllUsers();
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    public UserProjection getUserByUserId(String userId) throws EmpathException{
        try {
            return userRepository.getUserByUserId(userId);
        } catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    public UserProjection getUserByInstagramId(String instagramId) throws EmpathException{
        try {
            return userRepository.getUserByInstagramId(instagramId);
        } catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    public User getUserByUserName(String userName) throws EmpathException{
        try {
            return userRepository.getUserByUserName(userName);
        } catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    public List<UserClientData> getUserClientDataByUserId(String userId) throws EmpathException {
        try {
            List<Client> clientList = clientRepository.getAllClients();
            List<UserClientData> userClientData = new ArrayList<>();
            for (Client client: clientList){
                UserClientRelation userClientRelation = userClientRelationRepository.getUserClientRelationByUserIdAndClientId( client.getClientId(), userId);
                UserClientData userClientDatum = new UserClientData();
                userClientDatum.setClientId(client.getClientId());
                userClientDatum.setUserId(userId);
                if(userClientRelation != null){
                    userClientDatum.setClientUserId(userClientRelation.getClientUserId());
                }
                userClientDatum.setClientName(client.getClientName());
                userClientData.add(userClientDatum);
            }
            return userClientData;
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    public void addUser(User user) throws EmpathException {
        try{
            User userCheckViaUserName = userRepository.getUserByUserName(user.getUserName());
            User userCheckViaUserEmail = userRepository.getUserByUserEmail(user.getUserEmail());
            if(userCheckViaUserEmail != null || userCheckViaUserName!=null){
                log.error("An error occurred because the username or email already exist");
                throw new EmpathException(ErrorCodes.ERROR_CODE_5.getMessage(), ErrorCodes.ERROR_CODE_5.getCode());
            }
            enrichUser(user);
            userRepository.save(user);
        }catch(EmpathException e){
            throw e;
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    @Transactional
    public void deleteUserByUserId(String userId) throws EmpathException {
        try{
            if(userRepository.getUserByUserId(userId) != null) {
                userRepository.deleteUserByUserId(userId);
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

    public void addClientUserId(UserClientRelation userClientRelation) throws EmpathException {
        try{
            UserClientRelation userClientRelationCheck = userClientRelationRepository.getUserClientRelationByUserIdAndClientId(userClientRelation.getClientId(),
                    userClientRelation.getUserId());
            if(userClientRelationCheck != null){
                userClientRelationCheck.setClientUserId(clientIdService.getClientId(userClientRelation.getUserId(), userClientRelation.getClientId()));
                userClientRelationRepository.save(userClientRelationCheck);
            }else {
                userClientRelation.setClientUserId(clientIdService.getClientId(userClientRelation.getUserId(), userClientRelation.getClientId()));
                enrichUserClientRelation(userClientRelation);
                userClientRelationRepository.save(userClientRelation);
            }
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    @Transactional
    public void updateInstagramIdByUserId(String userId, String code) throws EmpathException {
        try{
            Optional<String> instagramId = instagramService.authProcess(code);
            if(instagramId.isPresent()) {
                userRepository.updateInstagramIdByUserId(userId, instagramId.get());
            }else{
                log.error("Failed to fetch user's instagram id");
                throw new EmpathException(ErrorCodes.ERROR_CODE_3.getMessage(), ErrorCodes.ERROR_CODE_3.getCode());
            }
        }catch(EmpathException e){
            throw e;
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    private void enrichUser(User user){
        user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
        user.setUserId(CommonUtil.getUUID());
        user.setUserPoints(0);
    }

    private void enrichUserClientRelation(UserClientRelation userClientRelation){
        userClientRelation.setUserClientRelationId(CommonUtil.getUUID());
    }

    public void increaseOrDeductPointsByUserId(String userId, int points) throws EmpathException {
        userRepository.increaseOrDeductPointsByUserId(userId, points);
    }
}
