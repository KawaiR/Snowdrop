package com.example.snowdropserver.Models.Domains;

        import lombok.AllArgsConstructor;
        import lombok.Builder;
        import lombok.NoArgsConstructor;
        import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class DeviceDomain {
    String expoPushToken;
    String location;
    String username;

    public DeviceDomain() {
        expoPushToken = null;
        location = null;
        username = null;
    }
}
