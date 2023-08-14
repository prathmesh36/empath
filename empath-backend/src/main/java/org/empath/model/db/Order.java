package org.empath.model.db;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
@Setter
@Getter
public class Order {

    @Id
    public String orderId;

    public String expId;

    public String userId;

    public int totalCost;

    public int totalQuantity;

    public String orderAddress;

    public Timestamp createdTimestamp;
}
