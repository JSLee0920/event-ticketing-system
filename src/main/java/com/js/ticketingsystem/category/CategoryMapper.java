package com.js.ticketingsystem.category;

import com.js.ticketingsystem.category.dtos.CategoryResponse;
import com.js.ticketingsystem.model.entities.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryResponse toCategoryResponse(Category category);
}
