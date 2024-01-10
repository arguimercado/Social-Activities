using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddCancellation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Cancel_Date",
                table: "ActivityAttendees",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Cancel_IsCancelled",
                table: "ActivityAttendees",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "Cancel_Date",
                table: "Activites",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Cancel_IsCancelled",
                table: "Activites",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cancel_Date",
                table: "ActivityAttendees");

            migrationBuilder.DropColumn(
                name: "Cancel_IsCancelled",
                table: "ActivityAttendees");

            migrationBuilder.DropColumn(
                name: "Cancel_Date",
                table: "Activites");

            migrationBuilder.DropColumn(
                name: "Cancel_IsCancelled",
                table: "Activites");
        }
    }
}
