package com.hoangtien2k3.rating.viewmodel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerVm {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
}
