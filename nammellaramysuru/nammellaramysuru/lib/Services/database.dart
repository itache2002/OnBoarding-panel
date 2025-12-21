import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:nammellaramysuru/Model/community_model.dart';

class Database {
  static Future<List<Community>> fetchCommunities() async {
    final resp = await http.get(
      Uri.parse(
        'https://admin.api.nammellaramysuru.in/api/v1/community'
        '?sortBy=created_at&order=desc&limit=10&offset=0&paged=true',
      ),
    );
    if (resp.statusCode == 200) {
      final decoded = jsonDecode(resp.body) as Map<String, dynamic>;
      final rows = decoded['rows'] as List;
      return rows.map((e) => Community.fromJson(e)).toList();
    } else {
      throw Exception('Failed to load communities');
    }
  }

  static Future<List<Community>> fetchEvents() async {
    final resp = await http.get(
      Uri.parse(
        'https://admin.api.nammellaramysuru.in/api/v1/events?sortBy=created_at&order=desc&limit=10&offset=0&paged=true',
      ),
    );
    if (resp.statusCode == 200) {
      final decoded = jsonDecode(resp.body) as Map<String, dynamic>;
      final rows = decoded['rows'] as List;
      return rows.map((e) => Community.fromJson(e)).toList();
    } else {
      throw Exception('Failed to load communities');
    }
  }
}
