package org.empath.model.db;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
@Setter
@Getter
public class Messaging {
    @Id
    public String messageId;

    public String clientId;

    public String UserId;

    public String message;

    public Boolean flow;

    public Timestamp createdTimestamp;
}
