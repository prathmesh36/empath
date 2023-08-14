package org.empath.model.dto.instagram;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InstagramAccessToken {
    @JsonProperty("access_token")
    public String accessToken;

    @JsonProperty("user_id")
    public String userId;
}
