package org.empath.repository;

import org.empath.model.db.Ledger;
import org.empath.model.db.User;
import org.empath.repository.projection.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LedgerRepository extends JpaRepository<Ledger, String> {

}
