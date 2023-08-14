package org.empath.repository;

import org.empath.model.db.Experience;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExperienceRepository extends CrudRepository<Experience, Integer> {

    //TODO: Update queries

    @Query(value = "SELECT * FROM EXPERIENCE u", nativeQuery = true)
    List<Experience> getAllExperiences();

    @Query(value = "SELECT * FROM EXPERIENCE u WHERE EXP_DATE >= :expDate AND EXP_QUANTITY > 0", nativeQuery = true)
    List<Experience> getAllUpcomingExperiences(@Param("expDate") String expDate);

    @Query(value = "SELECT * FROM EXPERIENCE u WHERE u.EXP_ID = :expId", nativeQuery = true)
    Experience getExperienceByExpId(@Param("expId") String expId);

    @Modifying
    @Query(value = "DELETE FROM EXPERIENCE WHERE EXP_ID = :expId", nativeQuery = true)
    void deleteExperienceByExpId(@Param("expId") String expId);

    @Modifying
    @Query(value = "UPDATE EXPERIENCE SET EXP_QUANTITY = EXP_QUANTITY + :qty WHERE EXP_ID = :expId", nativeQuery = true)
    void increaseOrDeductExperienceQuantityByUserId(@Param("expId") String expId, @Param("qty") int qty);
}
