package org.empath.repository;

import org.empath.model.db.Messaging;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessagingRepository extends CrudRepository<Messaging, Integer> {

    @Query(value = "SELECT * FROM MESSAGING u", nativeQuery = true)
    List<Messaging> getAllMessages();

    @Query(value = "SELECT * FROM MESSAGING u WHERE u.USER_ID = :userId ORDER BY u.CREATED_TIMESTAMP ASC", nativeQuery = true)
    List<Messaging> getMessagesByUserId(@Param("userId") String userId);

    @Query(value = "SELECT * FROM MESSAGING u WHERE u.CLIENT_ID = :clientId", nativeQuery = true)
    List<Messaging> getMessagesByClientId(@Param("clientId") String clientId);

    @Query(value = "SELECT * FROM MESSAGING u WHERE u.MESSAGE_ID = :messageId", nativeQuery = true)
    List<Messaging> getMessagesByMessageId(@Param("messageId") String messageId);

    @Modifying
    @Query(value = "DELETE FROM MESSAGING WHERE MESSAGE_ID = :messageId", nativeQuery = true)
    void deleteMessageByMessageId(@Param("messageId") String messageId);

}
