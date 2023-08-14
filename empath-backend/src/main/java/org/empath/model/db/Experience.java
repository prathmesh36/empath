package org.empath.model.db;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Setter
@Getter
public class Experience {
    @Id
    public String expId;

    public String expName;

    public String expDescription;

    public String expLocation;

    public int expCost;

    public int expQuantity;

    public Date expDate;

    public String expPhotoUrl;

    public Timestamp createdTimestamp;
}
