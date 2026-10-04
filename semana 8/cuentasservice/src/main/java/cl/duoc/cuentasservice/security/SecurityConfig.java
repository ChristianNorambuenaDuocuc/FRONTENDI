package cl.duoc.cuentasservice.security;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                .csrf(csrf ->
                        csrf.disable()
                )

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers(
                                        "/api/cuentas/config"
                                )
                                .permitAll()

                                .anyRequest()
                                .authenticated()
                )

                .exceptionHandling(exception ->
                        exception

                                // Usuario no autenticado
                                .authenticationEntryPoint(
                                        (request, response, authException) ->
                                                response.sendError(
                                                        HttpServletResponse.SC_UNAUTHORIZED,
                                                        "No autenticado"
                                                )
                                )

                                // Usuario autenticado, pero sin permisos
                                .accessDeniedHandler(
                                        (request, response, accessDeniedException) ->
                                                response.sendError(
                                                        HttpServletResponse.SC_FORBIDDEN,
                                                        "Acceso denegado"
                                                )
                                )
                )

                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(Customizer.withDefaults())
                );

        return http.build();
    }
}