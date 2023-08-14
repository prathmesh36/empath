package org.empath.repository;

import org.empath.model.db.User;
import org.empath.repository.projection.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
    //TODO: Update queries

    @Query(value = "SELECT u.userId as userId, u.userName as userName, u.userEmail as userEmail, u.userAge as userAge, u.userPoints as userPoints, u.instagramId as instagramId, u.userFirstName as userFirstName, u.userLastName as userLastName, u.userState as userState, u.userCountry as userCountry FROM User u")
    List<UserProjection> getAllUsers();

    @Query(value = "SELECT u.userId as userId, u.userName as userName, u.userEmail as userEmail, u.userAge as userAge, u.userPoints as userPoints, u.instagramId as instagramId, u.userFirstName as userFirstName, u.userLastName as userLastName, u.userState as userState, u.userCountry as userCountry FROM User u WHERE u.userId = :userId")
    UserProjection getUserByUserId(@Param("userId") String userId);

    @Query(value = "SELECT u.userId as userId, u.userName as userName, u.userEmail as userEmail, u.userAge as userAge, u.userPoints as userPoints, u.instagramId as instagramId, u.userFirstName as userFirstName, u.userLastName as userLastName, u.userState as userState, u.userCountry as userCountry FROM User u WHERE u.instagramId = :instagramId")
    UserProjection getUserByInstagramId(@Param("instagramId") String instagramId);

    @Query(value = "SELECT * FROM USER u WHERE u.USER_NAME = :userName", nativeQuery = true)
    User getUserByUserName(@Param("userName") String userName);

    @Query(value = "SELECT * FROM USER u WHERE u.USER_EMAIL = :userEmail", nativeQuery = true)
    User getUserByUserEmail(@Param("userEmail") String userEmail);

    @Modifying
    @Query(value = "DELETE FROM USER WHERE USER_ID = :userId", nativeQuery = true)
    void deleteUserByUserId(@Param("userId") String userId);

    @Modifying
    @Query(value = "UPDATE USER SET INSTAGRAM_ID = :instagramId WHERE USER_ID = :userId", nativeQuery = true)
    void updateInstagramIdByUserId(@Param("userId") String userId, @Param("instagramId") String instagramId);

    @Modifying
    @Query(value = "UPDATE USER SET USER_POINTS = USER_POINTS + :points WHERE USER_ID = :userId", nativeQuery = true)
    void increaseOrDeductPointsByUserId(@Param("userId") String userId, @Param("points") int points);
}
