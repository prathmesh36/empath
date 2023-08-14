package org.empath.repository;

import org.empath.model.db.Client;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClientRepository extends CrudRepository<Client, Integer> {

    //TODO: Update queries

    @Query(value = "SELECT * FROM CLIENT u", nativeQuery = true)
    List<Client> getAllClients();

    @Query(value = "SELECT * FROM CLIENT u WHERE u.CLIENT_ID = :clientId", nativeQuery = true)
    Client getClientByClientId(@Param("clientId") String clientId);

    @Modifying
    @Query(value = "DELETE FROM CLIENT WHERE CLIENT_ID = :clientId", nativeQuery = true)
    void deleteClientByClientId(@Param("clientId") String clientId);
}
