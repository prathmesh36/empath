package org.empath.service;

import lombok.extern.slf4j.Slf4j;
import org.empath.constant.ErrorCodes;
import org.empath.exception.EmpathException;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
public class RestService {
    public String makePostRequest(MultiValueMap<String, String> requestBody, HttpHeaders headers, String url) throws EmpathException {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
            return responseEntity.getBody();
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_3.getMessage(), ErrorCodes.ERROR_CODE_3.getCode());
        }
    }

    public String makeGetRequest(String url) throws EmpathException {
        try {
            RestTemplate restTemplate = new RestTemplate();
            return restTemplate.getForObject(url, String.class);
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_3.getMessage(), ErrorCodes.ERROR_CODE_3.getCode());
        }
    }
}
