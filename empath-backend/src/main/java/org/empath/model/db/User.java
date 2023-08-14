package org.empath.model.db;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
@Setter
@Getter
public class User {
    @Id
    public String userId;

    public String userName;

    public String userFirstName;

    public String userLastName;

    public String userState;

    public String userCountry;

    public String userEmail;

    public String userPassword;

    public int userAge;

    public String userGender;

    public int userPoints;

    public String instagramId;

    public Timestamp createdTimestamp;
}
