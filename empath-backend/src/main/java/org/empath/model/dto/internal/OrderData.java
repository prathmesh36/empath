package org.empath.model.dto.internal;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Setter
@Getter
public class OrderData {

    public String orderId;

    public String expId;

    public String expName;

    public String userId;

    public int totalCost;

    public int totalQuantity;

    public String orderAddress;

    public Timestamp createdTimestamp;
}
