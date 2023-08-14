package org.empath.repository;

import org.empath.model.db.UserClientRelation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserClientRelationRepository extends CrudRepository<UserClientRelation, Integer> {
    //TODO: Update queries

    @Query(value = "SELECT * FROM USER_CLIENT_RELATION u", nativeQuery = true)
    List<UserClientRelation> getAllUserClientRelations();

    @Query(value = "SELECT * FROM USER_CLIENT_RELATION u WHERE u.USER_ID = :userId", nativeQuery = true)
    List<UserClientRelation> getUserClientRelationsByUserId(@Param("userId") String userId);

    @Query(value = "SELECT * FROM USER_CLIENT_RELATION u WHERE u.CLIENT_ID = :clientId", nativeQuery = true)
    List<UserClientRelation> getUserClientRelationsByClientId(@Param("clientId") String clientId);

    @Query(value = "SELECT * FROM USER_CLIENT_RELATION u WHERE u.CLIENT_USER_ID = :clientUserId and u.CLIENT_ID = :clientId", nativeQuery = true)
    UserClientRelation getUserClientRelationsByClientUserIdAndClientId(@Param("clientUserId") String clientUserId, @Param("clientId") String clientId);

    @Query(value = "SELECT * FROM USER_CLIENT_RELATION u WHERE u.CLIENT_ID = :clientId and u.USER_ID = :userId", nativeQuery = true)
    UserClientRelation getUserClientRelationByUserIdAndClientId(@Param("clientId") String clientId, @Param("userId") String userId);

}
