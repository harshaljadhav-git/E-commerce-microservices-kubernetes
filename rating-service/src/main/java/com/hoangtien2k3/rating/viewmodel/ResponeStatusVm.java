package com.hoangtien2k3.rating.viewmodel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponeStatusVm {
    private String title;
    private String message;
    private String statusCode;
}
