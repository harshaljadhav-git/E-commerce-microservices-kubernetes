package com.hoangtien2k3.rating.viewmodel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RatingPostVm {
    private String content;
    private int star;
    private Long productId;
    private String productName;
}

