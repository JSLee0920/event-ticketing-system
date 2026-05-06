package com.js.ticketingsystem.user;

import com.js.ticketingsystem.model.entities.User;
import com.js.ticketingsystem.user.dtos.UserResponse;
import com.js.ticketingsystem.user.dtos.UserSummaryResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toUserResponse(User user);

    UserSummaryResponse toUserSummaryResponse(User user);
}
