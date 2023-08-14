package org.empath.model.db;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
@Setter
@Getter
public class Client {
    @Id
    public String clientId;

    public String clientName;

    public String clientDescription;

    public String clientHostUrl;

    public Timestamp createdTimestamp;
}
