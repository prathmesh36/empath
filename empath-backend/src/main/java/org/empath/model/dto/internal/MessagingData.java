package org.empath.model.dto.internal;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Setter
@Getter
public class MessagingData {
    public String messageId;

    public String clientId;

    public String clientName;

    public String UserId;

    public String message;

    public boolean flow;

    public Timestamp createdTimestamp;
}
