using System.Security.Claims;
using API.Dto;
using API.Services;
using Domain.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly TokenService _tokenService;

    public AccountController(UserManager<AppUser> userManager,TokenService tokenService) {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody]LoginDto login) {
        
        var user = await _userManager.FindByEmailAsync(login.Email);

        if(user == null) return Unauthorized();

        var result = await _userManager.CheckPasswordAsync(user,login.Password);

        if(result)
        {
            return Ok(CreateUserDto(user));
        }

        return Unauthorized(); 
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto register) {

        if(await _userManager
                    .Users
                    .AnyAsync(x => x.UserName == register.UserName)) {
            
            return BadRequest("Username is already exist");
        }

        if(await _userManager.Users.AnyAsync(x => x.Email == register.Email)) {
            return BadRequest("Email is already taken");
        }

        var user = new AppUser {
            DisplayName = register.DisplayName,
            Email = register.Email,
            UserName = register.UserName
        };

        var result = await _userManager.CreateAsync(user,register.Password);

        if(result.Succeeded) {
            return CreateUserDto(user);
        }

        return BadRequest(result.Errors);
    }

    
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await _userManager.Users
                            .Include(p => p.Photos)
                            .FirstOrDefaultAsync(u => u.Email == User.FindFirstValue(ClaimTypes.Email));
                            
        return CreateUserDto(user);
    }

    private UserDto CreateUserDto(AppUser user)
    {
        return new UserDto {
            Displayname = user.DisplayName,
            Image = user.Photos.FirstOrDefault(u => u.IsMain)?.Url,
            Token = _tokenService.CreatToken(user),
            Username = user.UserName
        };
    }
}