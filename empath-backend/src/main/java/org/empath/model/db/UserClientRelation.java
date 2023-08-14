package org.empath.model.db;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Setter
@Getter
public class UserClientRelation {
    @Id
    public String userClientRelationId;

    public String userId;

    public String clientId;

    public String clientUserId;

}
