using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Users;

namespace Domain.Contracts
{
    public interface IUserRepository
    {
        Task<AppUser> FindByUsername(string username);
    }
}