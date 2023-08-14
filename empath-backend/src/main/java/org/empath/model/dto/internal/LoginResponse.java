package org.empath.model.dto.internal;

import lombok.Getter;
import lombok.Setter;
import org.empath.model.db.User;

import java.time.Duration;
import java.time.Instant;

@Getter
@Setter
public class LoginResponse {
    public String token;
    public User user;
    public long tokenExpiry;

    public LoginResponse(String jwtToken, User user) {
        this.token = jwtToken;
        this.user = user;
        Duration duration = Duration.ofHours( 12 );
        this.tokenExpiry = Instant.now().plus(duration).getEpochSecond();
    }
}
