package com.hoangtien2k3.rating.viewmodel;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingListVm {
    private List<RatingVm> ratingList;
    private long totalElements;
    private int totalPages;
}


