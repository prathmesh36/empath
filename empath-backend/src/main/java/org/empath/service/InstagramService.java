package org.empath.service;

import lombok.extern.slf4j.Slf4j;
import org.empath.constant.ErrorCodes;
import org.empath.exception.EmpathException;
import org.empath.model.dto.instagram.InstagramAccessToken;
import org.empath.model.dto.instagram.InstagramUserBasic;
import org.empath.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Optional;

@Slf4j
@Service
public class InstagramService {

    @Autowired
    private Environment environment;

    @Autowired
    private RestService restService;

    @Value("${instagram.redirect-url}")
    private String redirectUrl;

    @Value("${instagram.access-token-url}")
    private String accessTokenUrl;

    @Value("${instagram.data-url}")
    private String dataUrl;

    public Optional<String> authProcess(String code) throws EmpathException {
        InstagramAccessToken instagramAccessToken = getAccessToken(code);
        InstagramUserBasic instagramUserBasic = null;
        if(instagramAccessToken!=null){
            instagramUserBasic = getInstagramId(instagramAccessToken);
            return Optional.of(instagramUserBasic.getUsername());
        }
        return Optional.empty();
    }

    private InstagramAccessToken getAccessToken(String code) throws EmpathException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("client_id", environment.getProperty("CLIENT_ID"));
        requestBody.add("client_secret", environment.getProperty("CLIENT_SECRET"));
        requestBody.add("code", code);
        requestBody.add("redirect_uri", redirectUrl);
        requestBody.add("grant_type", "authorization_code");
        String body = restService.makePostRequest(requestBody, headers, accessTokenUrl);

        InstagramAccessToken instagramAccessToken;
        try {
            instagramAccessToken = CommonUtil.fromJson(body, InstagramAccessToken.class);
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_4.getMessage(), ErrorCodes.ERROR_CODE_4.getCode());
        }
        return instagramAccessToken;
    }

    private InstagramUserBasic getInstagramId(InstagramAccessToken instagramAccessToken) throws EmpathException {
        String url = dataUrl + instagramAccessToken.getUserId() + "?fields=id,username"
                + "&access_token=" + instagramAccessToken.getAccessToken();
        String body = restService.makeGetRequest(url);

        InstagramUserBasic instagramUserBasic;
        try{
            instagramUserBasic = CommonUtil.fromJson(body, InstagramUserBasic.class);
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_4.getMessage(), ErrorCodes.ERROR_CODE_4.getCode());
        }
        return instagramUserBasic;
    }
}
