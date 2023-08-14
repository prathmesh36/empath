package org.empath.configuration.security;

import lombok.extern.slf4j.Slf4j;
import org.empath.model.db.User;
import org.empath.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Slf4j
@Component
public class AuthenticationProvider implements org.springframework.security.authentication.AuthenticationProvider {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        User user = userRepository.getUserByUserName(username);

        if(user==null)
            throw new BadCredentialsException("Invalid username");
        if (!passwordEncoder.matches(password, user.getUserPassword()))
            throw new BadCredentialsException("Invalid password");

        org.springframework.security.core.userdetails.User sUser = new org.springframework.security.core.userdetails.User(user.getUserName(),
                user.getUserPassword(),
                new ArrayList<>());

        return new UsernamePasswordAuthenticationToken(sUser, password, sUser.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}

