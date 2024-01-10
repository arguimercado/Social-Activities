using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Activities;
using Domain.Users;
using Microsoft.AspNetCore.Identity;

namespace Persistence;
public class Seed
{
    public static async Task SeedData(ActivityContext context, UserManager<AppUser> userManager)
    {
        var users = new List<AppUser>();
        if (!userManager.Users.Any())
        {

            users = new List<AppUser> {
                new() {DisplayName="Bob",UserName="bob",Email="bob@test.com"},
                new() {DisplayName="Tom",UserName="tom",Email="tom@test.com"},
                new() {DisplayName="Jane",UserName="jane",Email="jane@test.com"},
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "P@$$w0rd");
            }
        }
        else
        {
            users = [.. userManager.Users];
        }

        var activities = new List<Activity>
            {
                Activity.CreateWithAttendee("Past Activity 1",
                                            DateTime.UtcNow.AddMonths(-2),
                                            "Activity 2 months ago",
                                            "drinks",
                                            "London",
                                            "Pub",
                                            users[0].UserName,users[0],true),

                Activity.CreateWithAttendee("Past Activity 2",
                                            DateTime.UtcNow.AddMonths(-1),
                                            "Activity 1 month ago",
                                            "culture",
                                            "Paris",
                                            "Louvre",
                                            users[0].UserName,users[0],true),

                Activity.CreateWithAttendee("Future Activity 1",
                                            DateTime.UtcNow.AddMonths(1),
                                            "Activity 1 month in future",
                                            "culture",
                                            "London",
                                            "Natural History Museum",
                                            users[1].UserName,users[1],true),

                Activity.CreateWithAttendee("Future Activity 2",
                                            DateTime.UtcNow.AddMonths(2),
                                            "Activity 2 months in future",
                                            "music",
                                            "London",
                                            "O2 Arena",
                                            users[1].UserName,users[1],true),

                Activity.CreateWithAttendee("Future Activity 3",
                                            DateTime.UtcNow.AddMonths(3),
                                            "Activity 3 months in future",
                                            "drinks",
                                            "London",
                                            "Another pub",
                                            users[2].UserName,users[2],true),

                Activity.CreateWithAttendee("Future Activity 4",
                                            DateTime.UtcNow.AddMonths(4),
                                            "Activity 4 months in future",
                                            "drinks",
                                            "London",
                                            "Yet another pub",
                                            users[2].UserName,users[2],true),
            };


        //add attendee
        foreach (var activity in activities)
        {

            if (activity.IsHost(users[0].UserName))
            {
                activity.AddAttendee(users[1], false);
                activity.AddAttendee(users[2], false);
            }

            else if (activity.IsHost(users[1].UserName))
            {
                activity.AddAttendee(users[0], false);
                activity.AddAttendee(users[2], false);
            }

            else if (activity.IsHost(users[2].UserName))
            {
                activity.AddAttendee(users[0], false);
                activity.AddAttendee(users[1], false);
            }

        }

        await context.Activites.AddRangeAsync(activities);
        await context.SaveChangesAsync();
    }
}