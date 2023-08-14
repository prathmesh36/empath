package org.empath.service;

import org.empath.exception.EmpathException;
import org.empath.model.db.Client;
import org.empath.repository.UserRepository;
import org.empath.repository.projection.UserProjection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientIdService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ClientService clientService;

    //TODO (Empath): Authenticate the user same as done for instagram. Currently, using dummy data here in the below line.
    //TODO (Empath): Here we might have to call the client's api to get the user id associated to the user in our system.
    public String getClientId(String userId, String clientId) throws EmpathException {
        Client client = clientService.getClientByClientId(clientId);
        String url = client.getClientHostUrl();
        url = url + "empathAuth";

        //TODO (Empath): We need to call the aboce url for verification and get the user's username on the client website.
        UserProjection userProjection = userRepository.getUserByUserId(userId);
        return userProjection.getUserName();
    }

}
