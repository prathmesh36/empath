package org.empath.model.db;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
@Setter
@Getter
public class Ledger {
    @Id
    public String entryId;

    public String userId;

    public String debitCredit;

    public String debitCreditType;

    public String debitCreditReference;

    public int debitCreditPoints;

    public Timestamp createdTimestamp;
}
