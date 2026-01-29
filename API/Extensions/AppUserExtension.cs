using System;
using API.DTO;
using API.Entities;
using API.Interfaces;

namespace API.Extensions;

public static class AppUserExtension
{
    public static UserDto ToDto (this AppUser user,ITokenService tokenService)
    {
       
    {
        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            Username = user.UserName,
           
            Token = tokenService.CreateToken(user)
        };
    }
    }

}
