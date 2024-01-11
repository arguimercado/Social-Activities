using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Users;

namespace Domain.Photos
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }

        public string AppUserId { get; set; }

        public AppUser AppUser { get; set; }
    }
}