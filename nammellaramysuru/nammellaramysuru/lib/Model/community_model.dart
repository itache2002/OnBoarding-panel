class Community {
  final String id;
  final String name;
  final String category;
  final String subCategory;
  final String description;
  final String contact;
  final String email;
  final String address;
  final String inCharge;
  final SocialLinks socialLinks;
  final String logo;
  final String image;
  final bool reachedOut;
  final String createdAt;

  Community({
    required this.id,
    required this.name,
    required this.category,
    required this.subCategory,
    required this.description,
    required this.contact,
    required this.email,
    required this.address,
    required this.inCharge,
    required this.socialLinks,
    required this.logo,
    required this.image,
    required this.reachedOut,
    required this.createdAt,
  });

  factory Community.fromJson(Map<String, dynamic> json) {
    return Community(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      category: json['category'] ?? '',
      subCategory: json['sub_category'] ?? '',
      description: json['description'] ?? '',
      contact: json['contact'] ?? '',
      email: json['email'] ?? '',
      address: json['address'] ?? '',
      inCharge: json['in_charge'] ?? '',
      socialLinks: SocialLinks.fromJson(json['social_links'] ?? {}),
      logo: json['logo'] ?? '',
      image: json['image'] ?? '',
      reachedOut: json['reached_out'] ?? false,
      createdAt: json['created_at'] ?? '',
    );
  }
}

class SocialLinks {
  final String instagram;
  final String facebook;
  final String x;
  final String youtube;
  final String website;

  SocialLinks({
    required this.instagram,
    required this.facebook,
    required this.x,
    required this.youtube,
    required this.website,
  });

  factory SocialLinks.fromJson(Map<String, dynamic> json) {
    return SocialLinks(
      instagram: json['instagram'] ?? '',
      facebook: json['facebook'] ?? '',
      x: json['x'] ?? '',
      youtube: json['youtube'] ?? '',
      website: json['website'] ?? '',
    );
  }
}
