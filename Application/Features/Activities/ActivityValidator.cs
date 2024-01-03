
using Application.Features.Activities.Dtos;
using Domain;
using FluentValidation;

namespace Application.Features.Activities;

public class ActivityValidator : AbstractValidator<ActivityRequest>
{
    public ActivityValidator()
    {
        RuleFor(x => x.Title).NotEmpty();
        RuleFor(x => x.Description).NotEmpty();
        RuleFor(x => x.Date).NotEmpty();
        RuleFor(x => x.City).NotEmpty();
        RuleFor(x => x.Venue).NotEmpty();
    }
}