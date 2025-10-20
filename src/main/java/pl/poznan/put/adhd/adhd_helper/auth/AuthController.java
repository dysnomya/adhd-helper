package pl.poznan.put.adhd.adhd_helper.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;

import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private static final String CLIENT_ID = "357064822659-21afnq9ghfj0li9cmcdnb1iqannp0e9b.apps.googleusercontent.com";

    @PostMapping("/verify")
    public GoogleUser verifyToken(@RequestBody TokenRequest request) throws Exception {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                GsonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();

        GoogleIdToken idToken = verifier.verify(request.token);
        if (idToken == null) {
            throw new RuntimeException("Invalid Google token");
        }

        GoogleIdToken.Payload payload = idToken.getPayload();
        return new GoogleUser(
                payload.getEmail(),
                (String) payload.get("name"),
                (String) payload.get("picture")
        );
    }

    public record TokenRequest(String token) {}
    public record GoogleUser(String email, String name, String picture) {}
}
