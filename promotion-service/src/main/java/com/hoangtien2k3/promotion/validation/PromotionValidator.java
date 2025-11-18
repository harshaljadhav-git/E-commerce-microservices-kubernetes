package com.hoangtien2k3.promotion.validation;

import com.hoangtien2k3.promotion.model.enumeration.DiscountType;
import com.hoangtien2k3.promotion.model.enumeration.UsageType;
import com.hoangtien2k3.promotion.viewmodel.PromotionDto;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.apache.commons.collections.CollectionUtils;

public class PromotionValidator implements ConstraintValidator<PromotionConstraint, PromotionDto<?>> {

    @Override
    public boolean isValid(PromotionDto<?> promotionDto, ConstraintValidatorContext context) {
        if (promotionDto == null) return false;

        if (UsageType.LIMITED.equals(promotionDto.getUsageType()) && promotionDto.getUsageLimit() <= 0) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Usage limit must be > 0 for LIMITED usage")
                    .addPropertyNode("usageLimit").addConstraintViolation();
            return false;
        }

        if (!isValidDiscountType(promotionDto)) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Invalid discount value")
                    .addConstraintViolation();
            return false;
        }

        if (!isValidApplyToItems(promotionDto)) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Relevant IDs (product/brand/category) must not be empty")
                    .addConstraintViolation();
            return false;
        }

        return true;
    }

    private boolean isValidDiscountType(PromotionDto<?> promotion) {
        if (DiscountType.FIXED.equals(promotion.getDiscountType())) {
            return (Long) promotion.getDiscountAmount() > 0;
        } else {
            return (Long) promotion.getDiscountPercentage() > 0;
        }
    }

    private boolean isValidApplyToItems(PromotionDto<?> promotion) {
        return switch (promotion.getApplyTo()) {
            case PRODUCT -> CollectionUtils.isNotEmpty(promotion.getProductIds());
            case BRAND -> CollectionUtils.isNotEmpty(promotion.getBrandIds());
            case CATEGORY -> CollectionUtils.isNotEmpty(promotion.getCategoryIds());
        };
    }
}
