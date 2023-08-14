package org.empath.controller;

import lombok.extern.slf4j.Slf4j;
import org.empath.configuration.security.TokenManagerConfiguration;
import org.empath.constant.ErrorCodes;
import org.empath.exception.EmpathException;
import org.empath.model.db.User;
import org.empath.model.dto.internal.LoginRequest;
import org.empath.model.dto.internal.LoginResponse;
import org.empath.model.dto.Response;
import org.empath.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import static org.empath.constant.CommonConstants.REST_SUCCESS;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/v1/security")
public class LoginController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationProvider authenticationProvider;
    @Autowired
    private TokenManagerConfiguration tokenManager;

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody LoginRequest request) throws Exception {
        User user = null;

        try {
            authenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            user = userService.getUserByUserName(request.getUsername());
        } catch (DisabledException | BadCredentialsException e) {
            log.error("An error occurred: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response(ErrorCodes.ERROR_CODE_2.getCode() + " - " + ErrorCodes.ERROR_CODE_2.getMessage(), null));
        } catch (EmpathException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response(e.getErrorCode() + " - " + e.getMessage(), null));
        }

        if(user==null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new Response(ErrorCodes.ERROR_CODE_2.getCode() + " - " + ErrorCodes.ERROR_CODE_2.getMessage(), null)
            );
        }

        user.setUserPassword("*******");
        final String jwtToken = tokenManager.generateJwtToken(user.getUserName());
        return ResponseEntity.ok(new Response(REST_SUCCESS, new LoginResponse(jwtToken, user)));
    }
}
