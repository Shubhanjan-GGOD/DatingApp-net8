using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context,ITokenService tokenService):BaseApiController
{
    [HttpPost("register")]//account/register
    public async Task<ActionResult<UserDto>>Register(RegisterDto registerDto)
    {
        if(await EmailExists(registerDto.Email))
        {
            return BadRequest("Email is Taken");
        }
        // if(await UserExists(registerDto.Username))
        // {
        //     return BadRequest("User Name is Taken");
        // }
        using var hmac =new HMACSHA512();
        var user =new AppUser
        {
            UserName =registerDto.Username.ToLower(),
            Email = registerDto.Email,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt =hmac.Key
        };
        context.Users.Add(user);
        await context.SaveChangesAsync();
        // return new UserDto
        // {
        //     Id = user.Id,
        //     Email = user.Email,
        //     Username = user.UserName,
        //     Token = tokenService.CreateToken(user)
        // };
        return user.ToDto(tokenService);
    }
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        // var user = await context.Users.FirstOrDefaultAsync(x=>
        // x.UserName==loginDto.Username.ToLower());
         var user = await context.Users.FirstOrDefaultAsync(x=>
        x.Email==loginDto.Email);
        if(user==null)
        {
            return Unauthorized("Invalid Email Address");
        }
        using var hmac =new HMACSHA512(user.PasswordSalt);
        var computedHash =hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        for (int i = 0; i < computedHash.Length; i++)
        {
            if(computedHash[i]!=user.PasswordHash[i])
            return Unauthorized("Password is Incorrect");
        }
        // return new UserDto
        // {
        //     Id = user.Id,
        //     Email = user.Email,
        //     Username = user.UserName,
        //     Token = tokenService.CreateToken(user)
        // };
         return user.ToDto(tokenService);
    }
    // private async Task<bool>UserExists(string userName)
    // {
    //     return await context.Users.AnyAsync(x=>x.UserName.ToLower()==userName.ToLower());
    // }

     private async Task<bool>EmailExists(string email)
    {
        return await context.Users.AnyAsync(x=>x.Email.ToLower()==email.ToLower());
    }
}
