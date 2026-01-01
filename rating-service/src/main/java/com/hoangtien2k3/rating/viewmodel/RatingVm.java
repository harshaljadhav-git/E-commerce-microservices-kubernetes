package com.hoangtien2k3.rating.viewmodel;


import com.hoangtien2k3.rating.model.Rating;
import java.time.ZonedDateTime;
import com.hoangtien2k3.rating.model.Rating;
import java.time.ZonedDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RatingVm {
    private Long id;
    private String content;
    private int star;
    private Long productId;
    private String productName;
    private String createdBy;
    private String lastName;
    private String firstName;
    private ZonedDateTime createdOn;

    public static RatingVm fromModel(Rating rating) {
        return RatingVm.builder()
                .id(rating.getId())
                .content(rating.getContent())
                .star(rating.getRatingStar())
                .productId(rating.getProductId())
                .productName(rating.getProductName())
                .lastName(rating.getLastName())
                .firstName(rating.getFirstName())
                .createdBy(rating.getCreatedBy())
                .createdOn(rating.getCreatedOn())
                .build();
    }
}
