package org.empath.model.dto.internal;

import lombok.Getter;
import lombok.Setter;
import org.empath.model.db.Order;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;
import java.sql.Timestamp;

@Setter
@Getter
public class ExperienceData {
    public String expId;

    public String expName;

    public String expDescription;

    public String expLocation;

    public int expCost;

    public int expQuantity;

    public Date expDate;

    public String expPhotoUrl;

    public Order order;

    public Timestamp createdTimestamp;
}
