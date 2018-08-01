using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace stakeway.Api.Migrations
{
    public partial class BetArrayMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SelectedNumbers",
                table: "Bets",
                newName: "Stack");

            migrationBuilder.RenameColumn(
                name: "Ammount",
                table: "Bets",
                newName: "Numbers");

            migrationBuilder.AddColumn<string>(
                name: "Lines",
                table: "Bets",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lines",
                table: "Bets");

            migrationBuilder.RenameColumn(
                name: "Stack",
                table: "Bets",
                newName: "SelectedNumbers");

            migrationBuilder.RenameColumn(
                name: "Numbers",
                table: "Bets",
                newName: "Ammount");
        }
    }
}
