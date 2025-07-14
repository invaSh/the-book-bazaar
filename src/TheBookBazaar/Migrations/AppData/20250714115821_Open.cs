using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheBookBazaar.Migrations.AppData
{
    /// <inheritdoc />
    public partial class Open : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CloseDate",
                table: "Marketplaces",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Marketplaces",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "OpenDate",
                table: "Marketplaces",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Marketplaces",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Marketplaces",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CloseDate",
                table: "Marketplaces");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Marketplaces");

            migrationBuilder.DropColumn(
                name: "OpenDate",
                table: "Marketplaces");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Marketplaces");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Marketplaces");
        }
    }
}
