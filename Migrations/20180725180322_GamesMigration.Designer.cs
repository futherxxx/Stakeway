﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using stakeway.Api.Persistences;
using System;

namespace stakeway.Api.Migrations
{
    [DbContext(typeof(StakewayDbContext))]
    [Migration("20180725180322_GamesMigration")]
    partial class GamesMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("stakeway.Api.Models.Bet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Ammount");

                    b.Property<int>("GameId");

                    b.Property<string>("PlayerId");

                    b.Property<string>("SelectedNumbers");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.ToTable("Bets");
                });

            modelBuilder.Entity("stakeway.Api.Models.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("EndTime");

                    b.Property<string>("GameOrganization");

                    b.Property<string>("Max");

                    b.Property<string>("Min");

                    b.Property<string>("ModifiedBy");

                    b.Property<DateTime>("ModifiedDate");

                    b.Property<string>("Name");

                    b.Property<string>("StartTime");

                    b.HasKey("Id");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("stakeway.Api.Models.GameType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("GameId");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.ToTable("GameTypes");
                });

            modelBuilder.Entity("stakeway.Api.Models.Users", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BetAmmount");

                    b.Property<string>("Name");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("stakeway.Api.Models.Bet", b =>
                {
                    b.HasOne("stakeway.Api.Models.Game", "Game")
                        .WithMany("Bets")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("stakeway.Api.Models.GameType", b =>
                {
                    b.HasOne("stakeway.Api.Models.Game", "Game")
                        .WithMany("GameTypes")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}