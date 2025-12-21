import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:nammellaramysuru/Controller/home_controller.dart';
import 'package:nammellaramysuru/constants/controller_constants.dart';
import 'package:nammellaramysuru/widgets/swarapana_card.dart';

class SwarapanaWrapView extends StatelessWidget {
  final String layout;
  const SwarapanaWrapView({super.key, required this.layout});

  @override
  Widget build(BuildContext context) {
    // final events = EventProvider.events;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 8),
      child: SizedBox(
        width: double.infinity,
        child: GetX<HomeController>(
          init: HomeController(),
          initState: (_) {},
          builder: (_) {
            return Wrap(
              alignment: WrapAlignment.center,
              spacing: 180,
              runSpacing: 30,
              children:
                  (homeCtrl.isEvent.value
                          ? homeCtrl
                              .eventList // ← show events
                          : homeCtrl.communities) // ← show communities
                      .map(
                        (e) => SizedBox(
                          width: 480,
                          child: SwarapanaCard(community: e),
                        ),
                      )
                      .toList(),
              /* homeCtrl.communities
                      .map(
                        (e) => SizedBox(
                          width: 480,
                          child: SwarapanaCard(community: e),
                        ),
                      )
                      .toList(),*/
            );
          },
        ),
      ),
    );
  }
}
