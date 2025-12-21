import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:nammellaramysuru/Model/community_model.dart';
import 'package:nammellaramysuru/widgets/event_detail_dialog.dart';

import '../constants/controller_constants.dart' show homeCtrl;

class SwarapanaCard extends StatelessWidget {
  final Community community;
  const SwarapanaCard({super.key, required this.community});

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            width: 120,
            height: 120,
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFF6C0A27), width: 5),
            ),
            child: Image.asset('assets/images/6.png', fit: BoxFit.contain),
          ),
          Obx(
            () =>
                homeCtrl.isEvent.value
                    ? Expanded(
                      child: Container(
                        color: const Color(0xFFD7E1DF),
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              community.name,
                              style: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF007C7A),
                              ),
                            ),
                            Text(
                              community.description,
                              style: const TextStyle(
                                fontSize: 14,
                                color: Color(0xFFB22727),
                              ),
                            ),
                            Wrap(
                              spacing: 5,
                              runSpacing: 4,
                              children: [
                                Text(
                                  "Date: 12/11", // ${community.date}",
                                  style: const TextStyle(fontSize: 13),
                                ),
                                Text(
                                  "Time: 06:00 PM", //${community.time}",
                                  style: const TextStyle(fontSize: 13),
                                ),
                                Text(
                                  "Cost: Free", //${community.cost}",
                                  style: const TextStyle(
                                    fontSize: 13,
                                    color: Color(0xFFB22727),
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    )
                    : Expanded(
                      child: Container(
                        color: const Color(0xFFD7E1DF),
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              community.name,
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF007C7A),
                              ),
                            ),

                            Text(
                              community.description,
                              style: const TextStyle(
                                fontSize: 14,
                                color: Color(0xFFB22727),
                              ),
                            ),
                            /*  Row(
                              children: [
                                Text(
                                  "Come join us for a joyful Painting",
                                  style: const TextStyle(
                                    fontSize: 13,
                                    color: Color(0xFFB22727),
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),*/
                          ],
                        ),
                      ),
                    ),
          ),
          Obx(
            () =>
                homeCtrl.isEvent.value
                    ? Container(
                      height: 90,
                      color: const Color(0xFFD7E1DF),
                      padding: const EdgeInsets.all(10),
                      child: InkWell(
                        onTap:
                            () =>
                                showEventDetailDialog(Get.context!, community),
                        child: const Icon(
                          Icons.location_on,
                          color: Color(0xFF007C7A),
                          size: 50,
                        ),
                      ),
                    )
                    : Container(
                      color: const Color(0xFFD8E3DC),
                      padding: EdgeInsets.only(right: 10),
                      height: 80,
                      child: Center(
                        child: Material(
                          borderRadius: BorderRadius.circular(10),
                          color: Color(0xFF046777),
                          elevation: 2,
                          child: InkWell(
                            borderRadius: BorderRadius.circular(20),
                            onTap: () {
                              showEventDetailDialog(Get.context!, community);
                            },
                            child: const Padding(
                              padding: EdgeInsets.symmetric(
                                horizontal: 20,
                                vertical: 10,
                              ),
                              child: Text(
                                ' Join ',
                                style: TextStyle(
                                  color: Color(0xFFD8E3DC),
                                  fontSize: 14,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
          ),
        ],
      ),
    );
  }
}
/*import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:nammellaramysuru/Model/event_model.dart';
import 'package:nammellaramysuru/widgets/event_detail_dialog.dart';

import '../constants/controller_constants.dart' show homeCtrl;

class SwarapanaCard extends StatelessWidget {
  final Event event;
  const SwarapanaCard({super.key, required this.event});

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            width: 120,
            height: 120,
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFF6C0A27), width: 5),
            ),
            child: Image.asset('assets/images/6.png', fit: BoxFit.contain),
          ),
          Obx(
            () =>
                homeCtrl.isEvent.value
                    ? Expanded(
                      child: Container(
                        color: const Color(0xFFD7E1DF),
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              event.name,
                              style: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF007C7A),
                              ),
                            ),
                            Text(
                              event.description,
                              style: const TextStyle(
                                fontSize: 14,
                                color: Color(0xFFB22727),
                              ),
                            ),
                            Wrap(
                              spacing: 5,
                              runSpacing: 4,
                              children: [
                                Text(
                                  "Date: ${event.date}",
                                  style: const TextStyle(fontSize: 13),
                                ),
                                Text(
                                  "Time: ${event.time}",
                                  style: const TextStyle(fontSize: 13),
                                ),
                                Text(
                                  "Cost: ${event.cost}",
                                  style: const TextStyle(
                                    fontSize: 13,
                                    color: Color(0xFFB22727),
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    )
                    : Expanded(
                      child: Container(
                        color: const Color(0xFFD7E1DF),
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              event.name,
                              style: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF007C7A),
                              ),
                            ),

                            Text(
                              "Come join us for a joyful Painting session",
                              style: const TextStyle(
                                fontSize: 13,
                                color: Color(0xFFB22727),
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Row(
                              children: [
                                Text(
                                  "Come join us for a joyful Painting session",
                                  style: const TextStyle(
                                    fontSize: 13,
                                    color: Color(0xFFB22727),
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
          ),
          Obx(
            () =>
                homeCtrl.isEvent.value
                    ? Container(
                      height: 90,
                      color: const Color(0xFFD7E1DF),
                      padding: const EdgeInsets.all(10),
                      child: InkWell(
                        onTap: () => showEventDetailDialog(Get.context!, event),
                        child: const Icon(
                          Icons.location_on,
                          color: Color(0xFF007C7A),
                          size: 50,
                        ),
                      ),
                    )
                    : Container(
                      color: const Color(0xFFD8E3DC),
                      padding: EdgeInsets.only(right: 10),
                      height: 90,
                      child: Center(
                        child: Material(
                          borderRadius: BorderRadius.circular(10),
                          color: Color(0xFF046777),
                          elevation: 2,
                          child: InkWell(
                            borderRadius: BorderRadius.circular(20),
                            onTap: () {
                              showEventDetailDialog(Get.context!, event);
                            },
                            child: const Padding(
                              padding: EdgeInsets.symmetric(
                                horizontal: 20,
                                vertical: 10,
                              ),
                              child: Text(
                                ' Join ',
                                style: TextStyle(
                                  color: Color(0xFFD8E3DC),
                                  fontSize: 14,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
          ),
        ],
      ),
    );
  }
}
*/